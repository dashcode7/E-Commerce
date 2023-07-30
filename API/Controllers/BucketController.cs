using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System.Text.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BucketController:ControllerBase
    {
        private readonly IDatabase _connection;

        public BucketController(IConnectionMultiplexer connection)
        {
            _connection = connection.GetDatabase();
        }
        [HttpGet("GetBucket")]

        public async Task<ActionResult<CustomerBucket>> getBucketList(string id)
        {
            var result = await _connection.StringGetAsync(id);
            return Ok(result.IsNullOrEmpty ? new CustomerBucket(id) : JsonSerializer.Deserialize<CustomerBucket>(result));

        }
        [HttpPost("UpdateBucket")]

        public async Task<ActionResult<CustomerBucket>> updateBucket(CustomerBucket bucket)
        {
            var result = await _connection.StringSetAsync(bucket.Id, JsonSerializer.Serialize(bucket),TimeSpan.FromDays(30));
            if (result) return await getBucketList(bucket.Id);
            return Ok(null);
        }

        [HttpDelete("DeleteBucket")]
        public async Task<bool> DeleteBucket(string id)
        {
            return await _connection.KeyDeleteAsync(id);
        }

    }
}
