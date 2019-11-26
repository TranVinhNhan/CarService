using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CarService.API.Dtos;
using CarService.API.Models;
using CarService.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarService.API.Controllers
{
    [Authorize(Roles = "Admin")]
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

        [AllowAnonymous]
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

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _repo.GetOrders();

            return Ok(orders);
        }

        [AllowAnonymous]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetOrderByUser(int userId)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            // {
            //     return Unauthorized();
            // }
            if (userId == 2)
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);
            if (userFromRepo == null)
            {
                return BadRequest();
            }

            return Ok(userFromRepo.ProductOrders);
        }
    }
}