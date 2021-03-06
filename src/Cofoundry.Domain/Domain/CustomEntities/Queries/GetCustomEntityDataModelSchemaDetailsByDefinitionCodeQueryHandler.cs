﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cofoundry.Domain.Data;
using Cofoundry.Domain.CQS;

namespace Cofoundry.Domain
{
    public class GetCustomEntityDataModelSchemaDetailsByDefinitionCodeQueryHandler 
        : IAsyncQueryHandler<GetCustomEntityDataModelSchemaDetailsByDefinitionCodeQuery, CustomEntityDataModelSchema>
        , IPermissionRestrictedQueryHandler<GetCustomEntityDataModelSchemaDetailsByDefinitionCodeQuery, CustomEntityDataModelSchema>
    {
        #region constructor

        private readonly CofoundryDbContext _dbContext;
        private readonly IQueryExecutor _queryExecutor;
        private readonly IDynamicDataModelSchemaMapper _dynamicDataModelTypeMapper;
        private readonly ICustomEntityDefinitionRepository _customEntityDefinitionRepository;

        public GetCustomEntityDataModelSchemaDetailsByDefinitionCodeQueryHandler(
            CofoundryDbContext dbContext,
            IQueryExecutor queryExecutor,
            IDynamicDataModelSchemaMapper dynamicDataModelTypeMapper,
            ICustomEntityDefinitionRepository customEntityDefinitionRepository
            )
        {
            _queryExecutor = queryExecutor;
            _dbContext = dbContext;
            _dynamicDataModelTypeMapper = dynamicDataModelTypeMapper;
            _customEntityDefinitionRepository = customEntityDefinitionRepository;
        }

        #endregion

        #region execution

        public async Task<CustomEntityDataModelSchema> ExecuteAsync(GetCustomEntityDataModelSchemaDetailsByDefinitionCodeQuery query, IExecutionContext executionContext)
        {
            var definitionQuery = new GetCustomEntityDefinitionSummaryByCodeQuery(query.CustomEntityDefinitionCode);
            var definition = await _queryExecutor.ExecuteAsync(definitionQuery);
            if (definition == null) return null;

            var result = new CustomEntityDataModelSchema();
            result.CustomEntityDefinitionCode = definition.CustomEntityDefinitionCode;

            _dynamicDataModelTypeMapper.Map(result, definition.DataModelType);

            return result;
        }

        #endregion

        #region Permission

        public IEnumerable<IPermissionApplication> GetPermissions(GetCustomEntityDataModelSchemaDetailsByDefinitionCodeQuery query)
        {
            var definition = _customEntityDefinitionRepository.GetByCode(query.CustomEntityDefinitionCode);
            yield return new CustomEntityReadPermission(definition);
        }

        #endregion
    }
}
