using System;
using System.Threading.Tasks;
using AutoMapper;
using CarService.API.Dtos;
using CarService.API.Models;
using CarService.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarService.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IGenericRepository _repo;
        private readonly IMapper _mapper;
        public ServicesController(IGenericRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetServices()
        {
            var services = await _repo.GetAllServices();
            return Ok(services);
        }

        [HttpPost]
        public async Task<IActionResult> AddService(ServiceForCreationDto serviceForCreationDto)
        {
            var service = _mapper.Map<Service>(serviceForCreationDto);

            _repo.Add(service);

            if (await _repo.SaveAll())
            {
                return CreatedAtRoute("GetService", new { controller = "Services", id = service.Id }, service);
            }

            throw new Exception($"Adding service failed on save");
        }

        [HttpGet("{id}", Name = "GetService")]
        public async Task<IActionResult> GetService(int id)
        {
            var serviceFromRepo = await _repo.GetService(id);

            return Ok(serviceFromRepo);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var serviceFromRepo = await _repo.GetService(id);

            _repo.Delete(serviceFromRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"Delete service {id} failed on save");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, ServiceForUpdateDto serviceForUpdateDto)
        {
            var serviceFromRepo = await _repo.GetService(id);

            _mapper.Map(serviceForUpdateDto, serviceFromRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating service {id} failed on save");
        }
    }
}