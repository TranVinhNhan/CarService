using System.Threading.Tasks;
using CarService.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarService.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController: ControllerBase
    {
        private readonly IGenericRepository _repo;
        public ServicesController(IGenericRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetServices()
        {
            var services = await _repo.GetAllServices();
            return Ok(services);
        }
    }
}