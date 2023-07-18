using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController:ControllerBase
    {
        private readonly StoreContextcs _context;
        public ProductsController(StoreContextcs context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var result = await _context.Products.ToListAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetName(int id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}
