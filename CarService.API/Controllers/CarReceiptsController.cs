using System;
using System.Collections.Generic;
using System.Linq;
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
    public class CarReceiptsController : ControllerBase
    {
        private readonly IGenericRepository _repo;
        private readonly IMapper _mapper;
        public CarReceiptsController(IGenericRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AddCarReceipt(CarReceiptForCreationDto carReceiptForCreationDto)
        {
            if (carReceiptForCreationDto.UserId != 2 && carReceiptForCreationDto.UserId != 0)
            {
                var userFromRepo = await _repo.GetUser(carReceiptForCreationDto.UserId);
                var serviceFromRepo = await _repo.GetService(carReceiptForCreationDto.ServiceId);

                var carReceiptForCreation = _mapper.Map<CarReceipt>(carReceiptForCreationDto);
                carReceiptForCreation.DayReceived = DateTime.Now;

                userFromRepo.CarReceipts.Add(carReceiptForCreation);
                serviceFromRepo.CarReceipts.Add(carReceiptForCreation);

                if (await _repo.SaveAll())
                {
                    return CreatedAtRoute("GetCarReceipt", new { controller = "CarReceipts", id = carReceiptForCreation.Id }, carReceiptForCreation);
                }

                throw new Exception($"Create car receipt failed on save");
            }
            else
            {
                var anonymousUser = await _repo.GetUser(2);
                var serviceFromRepo = await _repo.GetService(carReceiptForCreationDto.ServiceId);

                var carReceiptForCreation = _mapper.Map<CarReceipt>(carReceiptForCreationDto);
                carReceiptForCreation.DayReceived = DateTime.Now;

                anonymousUser.CarReceipts.Add(carReceiptForCreation);
                serviceFromRepo.CarReceipts.Add(carReceiptForCreation);

                if (await _repo.SaveAll())
                {
                    return CreatedAtRoute("GetCarReceipt", new { controller = "CarReceipts", id = carReceiptForCreation.Id }, carReceiptForCreation);
                }

                throw new Exception($"Create Car Receipt failed on save");
            }
        }

        [HttpGet("admin/{id}", Name = "GetCarReceipt")]
        public async Task<IActionResult> GetCarReceipt(int id)
        {
            var carReceipt = await _repo.GetCarReceipt(id);

            return Ok(carReceipt);
        }

        [HttpGet]
        public async Task<IActionResult> GetCarReceipts()
        {
            var carReceipts = await _repo.GetCarReceipts();
            List<CarReceiptForReturnDto> list = new List<CarReceiptForReturnDto>();
            foreach (var item in carReceipts)
            {
                var mappedItem = _mapper.Map<CarReceiptForReturnDto>(item);
                list.Add(mappedItem);
            }

            return Ok(list);
        }

        [AllowAnonymous]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCarReceiptsByUser(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            if (userId == 2)
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);
            if (userFromRepo == null)
            {
                return BadRequest();
            }
            List<CarReceiptForReturnDto> list = new List<CarReceiptForReturnDto>();
            foreach (var item in userFromRepo.CarReceipts)
            {
                var mappedItem = _mapper.Map<CarReceiptForReturnDto>(item);
                list.Add(mappedItem);
            }

            return Ok(list);
        }
    }
}