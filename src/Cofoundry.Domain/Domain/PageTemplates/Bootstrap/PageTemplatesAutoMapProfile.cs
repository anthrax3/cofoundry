﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Cofoundry.Domain.Data;

namespace Cofoundry.Domain
{
    public class PageTemplatesAutoMapProfile : Profile
    {
        public PageTemplatesAutoMapProfile()
        {
            #region page Templates
            
            CreateMap<PageTemplate, PageTemplateSummary>()
                .ForMember(d => d.PageType, o => o.MapFrom(s => (PageType)s.PageTypeId))
                .ForMember(d => d.NumPages, o => o.MapFrom(s => s
                    .PageVersions
                    .GroupBy(p => p.PageId)
                    .Count()))
                .ForMember(d => d.NumRegions, o => o.MapFrom(s => s
                    .PageTemplateRegions
                    .Count()))
                ;
            
            #endregion
        }
    }
}
