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
    public class AutomotiveTypesController : ControllerBase
    {
        private readonly IGenericRepository _repo;
        private readonly IMapper _mapper;
        public AutomotiveTypesController(IGenericRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllTypes()
        {
            var types = await _repo.GetAllTypes();

            return Ok(types);
        }

        [HttpGet("{id}", Name = "GetType")]
        public async Task<IActionResult> GetType(int id)
        {
            var type = await _repo.GetType(id);

            return Ok(type);
        }

        [HttpPost]
        public async Task<IActionResult> AddType(TypeForCreationDto typeForCreationDto)
        {
            var type = _mapper.Map<AutomotivePartType>(typeForCreationDto);

            _repo.Add(type);

            if (await _repo.SaveAll())
            {
                return CreatedAtRoute("GetType", new { controller = "AutomotiveTypes", id = type.Id }, type);
            }

            throw new Exception($"Adding Product Type {typeForCreationDto.TypeName} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteType(int id)
        {
            var typeFromRepo = await _repo.GetType(id);
            _repo.Delete(typeFromRepo);
            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception($"Deleting product type id {id} failed on save");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateType(int id, TypeForUpdateDto typeForUpdateDto)
        {
            var typeFromRepo = await _repo.GetType(id);

            _mapper.Map(typeForUpdateDto, typeFromRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"Updating Product Type id {id} failed on save");
        }
    }
}