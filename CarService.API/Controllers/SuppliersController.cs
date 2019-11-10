using System.Threading.Tasks;
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
        public SuppliersController(IGenericRepository repo)
        {
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllSuppliers() {
            var sups = await _repo.GetAllSuppliers();

            return Ok(sups);
        }
    }
}