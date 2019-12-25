using AutoMapper;
using CarService.API.Dtos;
using CarService.API.Models;

namespace CarService.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForRegisterDto, User>();

            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();

            CreateMap<PartForCreationDto, AutomotivePart>();
            CreateMap<PartForUpdateDto, AutomotivePart>();
            
            CreateMap<ServiceForCreationDto, Service>();
            CreateMap<ServiceForUpdateDto, Service>();

            CreateMap<TypeForCreationDto, AutomotivePartType>();
            CreateMap<TypeForUpdateDto, AutomotivePartType>();

            CreateMap<SupplierForCreationDto, Supplier>();
            CreateMap<SupplierForUpdateDto, Supplier>();

            CreateMap<ProductOrderDetailForCreationDto, ProductOrderDetail>();
            CreateMap<ProductOrderForCreationDto, ProductOrder>();

            CreateMap<CarReceiptForCreationDto, CarReceipt>();
            CreateMap<CarReceipt, CarReceiptForReturnDto>();
        }
    }
}