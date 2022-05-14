using Application.Activities;
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
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivies()
        {
            return await Mediator.Send(new ActivityList.Query());

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActiviy(Guid id)
        {
            return await Mediator.Send(new ActivityDetails.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivies(Activity activity)
        {
            return Ok(await Mediator.Send(new CreateActivity.Command { Activity = activity }));
        }

        [HttpPut]
        public async Task<IActionResult> EditActivies(Activity activity)
        {
            return Ok(await Mediator.Send(new EditActivity.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }
    }
}
