﻿using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using WebApp.Domain;
using WebApp.Persistence;

namespace Application.Activities
{
    public class ActivityDetails
    {
        public class Query : IRequest<Result<Activity>>
        {

            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result< Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                return Result<Activity>.Success(activity);
            }
        }
    }
}
