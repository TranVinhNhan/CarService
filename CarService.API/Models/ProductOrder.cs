using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace CarService.API.Models
{
    public class ProductOrder
    {
        public int Id { get; set; }
        public DateTime OrderPlacedTime { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string AddressOptional { get; set; }
        public string Status { get; set; }
        public double OrderTotal { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<ProductOrderDetail> ProductOrderDetails { get; set; }
        public ProductOrder()
        {
            OrderPlacedTime = DateTime.Now;
            ProductOrderDetails = new Collection<ProductOrderDetail>();
            Status = "Pending";
        }
    }
}