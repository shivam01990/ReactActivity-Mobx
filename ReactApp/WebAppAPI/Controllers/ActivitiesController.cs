using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Domain;
using WebApp.Persistence;

namespace WebAppAPI.Controllers
{
   
    [ApiController]
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetActivies()
        {
            var result = await Mediator.Send(new ActivityList.Query());
            return HandleResult(result);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActiviy(Guid id)
        {
            var result = await Mediator.Send(new ActivityDetails.Query { Id = id });
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivies(Activity activity)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command { Activity = activity }));
        }

        [HttpPut]
        public async Task<IActionResult> EditActivies(Activity activity)
        {
            return HandleResult(await Mediator.Send(new EditActivity.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }
    }
}
