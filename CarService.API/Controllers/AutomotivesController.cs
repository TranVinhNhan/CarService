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
    public class AutomotivesController : ControllerBase
    {
        private readonly IGenericRepository _repo;
        private readonly IMapper _mapper;
        public AutomotivesController(IGenericRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> AddAutoPart(PartForCreationDto partForCreationDto)
        {
            var sup = await _repo.GetSupplier(partForCreationDto.SupplierId);
            var type = await _repo.GetType(partForCreationDto.AutomotivePartTypeId);
            var part = _mapper.Map<AutomotivePart>(partForCreationDto);

            sup.AutomotiveParts.Add(part);
            type.AutomotiveParts.Add(part);
            await _repo.SaveAll();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllParts()
        {
            var parts = await _repo.GetAllParts();

            return Ok(parts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPart(int id)
        {
            var part = await _repo.GetPart(id);

            return Ok(part);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAutoPart(int id)
        {
            var part = await _repo.GetPart(id);
            _repo.Delete(part);
            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception($"Deleting car part {id} failed on save");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePart(int id, PartForUpdateDto partForUpdateDto)
        {
            var partFromRepo = await _repo.GetPart(id);
            
            var part = _mapper.Map(partForUpdateDto, partFromRepo);

            var sup = await _repo.GetSupplier(partForUpdateDto.SupplierId);
            var type = await _repo.GetType(partForUpdateDto.AutomotivePartTypeId);

            part.Supplier = sup;
            part.AutomotivePartType = type;

            _repo.Update(part);

            // sup.AutomotiveParts.Add(part);
            // type.AutomotiveParts.Add(part);
            
            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating user {id} failed on save");
        }
    }
}