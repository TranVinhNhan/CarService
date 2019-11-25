using System.Threading.Tasks;
using CarService.API.Dtos;
using CarService.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CarService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShoppingCartService _shoppingCartService;
        private readonly IGenericRepository _repo;
        public ShoppingCartController(IGenericRepository repo, IShoppingCartService shoppingCartService)
        {
            _repo = repo;
            _shoppingCartService = shoppingCartService;
        }

        [HttpGet]
        public async Task<IActionResult> GetShoppingCart()
        {
            var items = await _shoppingCartService.GetShoppingCartItemsAsync();
            _shoppingCartService.ShoppingCartItems = items;

            var itemCountAndTotal = await _shoppingCartService.GetCartCountAndTotalAmountAsync();

            var shoppingCartForReturn = new ShoppingCartForReturnDto
            {
                ShoppingCartService = _shoppingCartService,
                ItemCount = itemCountAndTotal.ItemCount,
                TotalAmount = itemCountAndTotal.TotalAmount
            };

            return Ok(shoppingCartForReturn);
        }

        [HttpPut("add/{id}")]
        public async Task<IActionResult> AddToShoppingCart(int id)
        {
            var partFromRepo = await _repo.GetPart(id);
            if (partFromRepo != null)
            {
                await _shoppingCartService.AddToCartAsync(partFromRepo);
                return NoContent();
            }

            return NotFound();
        }

        [HttpPut("remove/{id}")]
        public async Task<IActionResult> RemoveFromShoppingCart(int id)
        {
            var partFromRepo = await _repo.GetPart(id);
            if (partFromRepo != null)
            {
                await _shoppingCartService.RemoveFromCartAsync(partFromRepo);
                return NoContent();
            }

            return NotFound();
        }
    }
}