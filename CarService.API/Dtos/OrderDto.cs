using System.Collections.Generic;

namespace CarService.API.Dtos
{
    public class OrderDto
    {
        public int UserId { get; set; }
        public ProductOrderForCreationDto ProductOrderForCreationDto { get; set; }
        public List<ProductOrderDetailForCreationDto> ProductOrderDetailForCreationDtos { get; set; }
    }
}