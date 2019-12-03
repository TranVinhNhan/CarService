using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CarService.API.Dtos;
using CarService.API.Helpers;
using CarService.API.Models;
using CarService.API.Repositories;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CarService.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/services/{serviceId}/photos")]
    [ApiController]
    public class ServicePhotosController : ControllerBase
    {
        private readonly IGenericRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public ServicePhotosController(IGenericRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetServicePhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForAutomotive(int serviceId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            var serviceFromRepo = await _repo.GetService(serviceId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("lfill")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            serviceFromRepo.Photo = photo;

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetServicePhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int serviceId, int id)
        {
            var serviceFromRepo = await _repo.GetService(serviceId);

            if (serviceFromRepo.Photo.Id != id)
                return BadRequest("Photo does not exist");

            var photoFromRepo = await _repo.GetPhoto(id);

            var deleteParams = new DeletionParams(photoFromRepo.PublicId);

            var result = _cloudinary.Destroy(deleteParams);

            if (result.Result == "ok")
            {
                _repo.Delete(photoFromRepo);
            }

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete photo");
        }
    }
}
