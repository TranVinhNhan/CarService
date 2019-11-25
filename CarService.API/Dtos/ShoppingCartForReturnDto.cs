using CarService.API.Repositories;

namespace CarService.API.Dtos
{
    public class ShoppingCartForReturnDto
    {
        public IShoppingCartService ShoppingCartService { get; set; }
        public int ItemCount { get; set; }
        public double TotalAmount { get; set; }
    }
}