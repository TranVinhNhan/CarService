using System.Threading.Tasks;
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
        public AutomotiveTypesController(IGenericRepository repo)
        {
            _repo = repo;

        }

        [HttpPost]
        public async Task<IActionResult> AddAutoPartType(AutomotivePartType type)
        {
            _repo.Add(type);
            await _repo.SaveAll();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTypes()
        {
            var types = await _repo.GetAllTypes();

            return Ok(types);
        }
    }
}