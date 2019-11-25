using System.Collections.Generic;
using System.Threading.Tasks;
using CarService.API.Models;

namespace CarService.API.Repositories
{
    public interface IShoppingCartService
    {
        string Id { get; set; }
        IEnumerable<ShoppingCartItem> ShoppingCartItems { get; set; }
        Task<int> AddToCartAsync(AutomotivePart part);
        Task ClearCartAsync();
        Task<IEnumerable<ShoppingCartItem>> GetShoppingCartItemsAsync();
        Task<int> RemoveFromCartAsync(AutomotivePart part);
        Task<(int ItemCount, double TotalAmount)> GetCartCountAndTotalAmountAsync();
    }
}