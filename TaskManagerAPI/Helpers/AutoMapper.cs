using System;
using AutoMapper;
using TaskManagerAPI.Dtos;
using TaskManagerAPI.Entities;

namespace TaskManagerAPI.Helpers;

public class AutoMapper : Profile
{
    public AutoMapper()
    {
        CreateMap<TaskEntity , TaskDto>();
        CreateMap<TaskDto , TaskEntity>();
    }
}
