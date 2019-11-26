using System;
using System.Threading.Tasks;
using AutoMapper;
using CarService.API.Dtos;
using CarService.API.Models;
using CarService.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CarService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductOrdersController : ControllerBase
    {
        private readonly IGenericRepository _repo;
        private readonly IMapper _mapper;
        public ProductOrdersController(IGenericRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> AddProductOrder(OrderDto orderDto)
        {
            var productOrder = new ProductOrder();
            _mapper.Map(orderDto.ProductOrderForCreationDto, productOrder);
            double total = 0;

            var userPlacedOrder = await _repo.GetUser(orderDto.UserId);
            var userAnonymous = await _repo.GetUser(2);
            productOrder.User = userPlacedOrder ?? userAnonymous;

            if (orderDto.ProductOrderDetailForCreationDtos.Count > 0)
            {
                foreach (var item in orderDto.ProductOrderDetailForCreationDtos)
                {
                    var productOrderDetail = _mapper.Map<ProductOrderDetail>(item);
                    productOrder.ProductOrderDetails.Add(productOrderDetail);
                    total += productOrderDetail.Price * productOrderDetail.Quantity;
                }
                productOrder.OrderTotal = total;

                _repo.Add(productOrder);

                if (await _repo.SaveAll())
                {
                    return StatusCode(201);
                }

                throw new Exception($"Adding order failed on save");
            }

            else return BadRequest();
        }
    }
}