using System.Collections.Generic;

namespace CarService.API.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public ICollection<CarReceipt> CarReceipts { get; set; }
        public Photo Photo { get; set; }
        public int PhotoId { get; set; }
    }
}