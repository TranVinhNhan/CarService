namespace CarService.API.Models
{
    public class ProductOrderDetail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public int ProductOrderId { get; set; }
        public ProductOrder ProductOrder { get; set; }
    }
}