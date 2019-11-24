namespace CarService.API.Models
{
    public class ShoppingCartItem
    {
        public string Id { get; set; }
        public int Quantity { get; set; }
        public int AutomotivePartId { get; set; }
        public AutomotivePart AutomotivePart { get; set; }

        
        public string ShoppingCartId { get; set; }
    }
}