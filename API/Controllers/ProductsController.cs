using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.ErrorResponse;
using Core.Model;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContextcs _context;
        public ProductsController(StoreContextcs context)
        {
            _context = context;
        }

        [HttpGet]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]

        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var result = await _context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .OrderBy(p => p.Id)
                .ToListAsync();
            return result;
        }



        [HttpGet("GetProductsWithPaginations")]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]

        public async Task<ActionResult<PaginatedList>> GetProductsWithPaginations(int page, string? searchstring,int pageSize = 5)
        {
            PaginatedList list = new PaginatedList();
            if (String.IsNullOrEmpty(searchstring))
            {
                var result = await _context.Products
                    .Include(p => p.ProductBrand)
                    .Include(p => p.ProductType)
                    .OrderBy(p => p.Id)
                    .Skip(page * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
                list.pageSize = pageSize;
                list.pageNumber = page;
                list.totalCount = result.Count;
                list.data = result;
                //return result;
            }
            else
            {
                var result = await _context.Products
                    .Include(p => p.ProductBrand)
                    .Include(p => p.ProductType)
                    .OrderBy(p => p.Id)
                    .Where(p => p.Name == searchstring || p.ProductType.Name == searchstring || p.ProductBrand.Name == searchstring)
                    .ToListAsync();
                list.pageSize = pageSize;
                list.pageNumber = page;
                list.totalCount = result.Count;
                list.data= result;
               // return result;
            }
            return list;
           
        }


        [HttpGet("ProductByBrand")]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]

        public async Task<ActionResult<List<Product>>> ProductByBrand(string brandname)
        {
            var result = await _context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .OrderBy(p => p.Id)
                .Where(p => p.ProductBrand.Name == brandname)
                .ToListAsync();
            return result;
        }


        [HttpGet("{id}")]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]
        [ProducesResponseTypeAttribute(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Product>> GetName(int id)
        {
            var result = await _context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .FirstOrDefaultAsync(p => p.Id == id);

            if(result != null)
            {
                return Ok(result);
            }
            return NotFound(new ErrorMessage(404));
        }


        [HttpGet("brand")]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]
        [ProducesResponseTypeAttribute(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrand()
        {
            return Ok(await _context.ProductBrand.ToListAsync());
        }


        [HttpGet("type")]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]
        [ProducesResponseTypeAttribute(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ProductType>>> GetProductType()
        {
            return Ok(await _context.ProductType.ToListAsync());
        }
    }
}
