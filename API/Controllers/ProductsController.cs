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
            var result = await _context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .ToListAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetName(int id)
        {
            return Ok(await _context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .FirstOrDefaultAsync(p => p.Id == id));
        }
        [HttpGet("brand")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrand()
        {
            return Ok(await _context.ProductBrand.ToListAsync());
        }
        [HttpGet("type")]
        public async Task<ActionResult<List<ProductType>>> GetProductType()
        {
            return Ok(await _context.ProductType.ToListAsync());
        }
    }
}
