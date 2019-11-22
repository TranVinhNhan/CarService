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
    public class SuppliersController : ControllerBase
    {
        private readonly IGenericRepository _repo;
        private readonly IMapper _mapper;
        public SuppliersController(IGenericRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSuppliers()
        {
            var sups = await _repo.GetAllSuppliers();

            return Ok(sups);
        }

        [HttpGet("{id}", Name = "GetSupplier")]
        public async Task<IActionResult> GetSupplier(int id)
        {
            var supplierFromRepo = await _repo.GetSupplier(id);

            return Ok(supplierFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> AddSupplier(SupplierForCreationDto supplierForCreationDto)
        {
            var supplier = _mapper.Map<Supplier>(supplierForCreationDto);

            _repo.Add(supplier);

            if (await _repo.SaveAll())
            {
                return CreatedAtRoute("GetSupplier", new { controller = "Suppliers", id = supplier.Id}, supplier);
            }
            
            throw new Exception($"Adding supplier failed on save");
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var supplierFromRepo = await _repo.GetSupplier(id);

            _repo.Delete(supplierFromRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Delete supplier {id} failed on save");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupplier (int id, SupplierForUpdateDto supplierForUpdateDto)
        {
            var supplierFromRepo = await _repo.GetSupplier(id);

            _mapper.Map(supplierForUpdateDto, supplierFromRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating supplier {id} failed on save");
        }
    }
}