using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.ErrorResponse;
using Core.Model;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Linq;
using System;

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
        [ApiExplorerSettings(IgnoreApi =true)]
        public  IEnumerable<Product> orderItems(List<Product> products,string sort = "name")
        {
            //var result = new List<Product>();
            if(sort == "name")
            {
                var  result = products.OrderBy(p => p.Name).AsEnumerable<Product>();
                return result;
            }
            else if (sort == "priceASC")
            {
                var result =  products.OrderBy(p => p.Price).AsEnumerable<Product>();
                return result;
            }
            else
            {
                var result =  products.OrderByDescending(p => p.Price).AsEnumerable<Product>();
                return result;
            }
            
        }

        [HttpGet]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]

        public async Task<ActionResult<List<Product>>> GetProducts(string sort, int page, string? searchstring, int pageSize = 6)
        {
            
            var result = await _context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .ToListAsync();
            result =  (List<Product>)orderItems(result, sort).Skip(page * pageSize).Take(pageSize);
            return Ok(result);
        }



        [HttpGet("GetProductsWithPaginations")]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]

        public PaginatedList GetProductsWithPaginations(List<Product> products,int page, string? searchstring,int pageSize = 6)
        {
            PaginatedList list = new PaginatedList();
            if (String.IsNullOrEmpty(searchstring))
            {
                var result = products
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
                list.pageSize = pageSize;
                list.pageNumber = page;
                list.data = result;
                //return result;
            }
            else
            {
                var result = products
                    .Where(p => p.Name.ToLower().Contains(searchstring.ToLower()) || p.ProductType.Name.ToLower().Contains(searchstring.ToLower()) || p.ProductBrand.Name.ToLower().Contains(searchstring.ToLower()))
                    .ToList();
                list.pageSize = pageSize;
                list.pageNumber = page;
                list.data= result;
                list.totalCount = result.Count;
               // return result;
            }
            return  list;
           
        }


        [HttpGet("ProductByBrandandTypeID")]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]

        public async Task<ActionResult<PaginatedList>> ProductByBrandandTypeID(int brandId,int typeId,string sort , int page, string? searchstring, int pageSize = 6)
        {
            if(brandId == 0 && typeId == 0)
            {
                if (String.IsNullOrEmpty(searchstring)) 
                { 
                PaginatedList listAll = new PaginatedList();
                var resp = await _context.Products
                                .Include(p => p.ProductBrand)
                                .Include(p => p.ProductType)
                                .ToListAsync();
                listAll.totalCount = resp.Count;
                var orderedlist = orderItems(resp, sort).Skip((page-1) * pageSize).Take(pageSize);
                listAll.data= orderedlist.ToList<Product>();
                listAll.pageSize = 6;
                listAll.pageNumber = page;
                
                return Ok(listAll);
                }
                else
                {
                    PaginatedList listAll = new PaginatedList();
                    var resp = await _context.Products
                                    .Include(p => p.ProductBrand)
                                    .Include(p => p.ProductType)
                                    .ToListAsync();
                    var orderedlist = GetProductsWithPaginations(resp.ToList<Product>(), page, searchstring, pageSize);
                    var list = orderItems(orderedlist.data, sort).Skip((page - 1) * pageSize).Take(pageSize);
                    listAll.data = list.ToList<Product>();
                    listAll.pageSize = 6;
                    listAll.totalCount = orderedlist.totalCount;
                    listAll.pageNumber = page;

                    return Ok(listAll);
                }
            }
            else if( brandId !=0 && typeId != 0)
            {
                var res = await _context.Products
               .Include(p => p.ProductBrand)
               .Include(p => p.ProductType)
               .Where(p => p.ProductBrandId == brandId && p.ProductTypeId == typeId)
               .ToListAsync();
                var count = res.Count;
                 var paginatedres =  GetProductsWithPaginations(res.ToList<Product>(),page, searchstring, pageSize);
                var list =orderItems(paginatedres.data, sort);
                paginatedres.data = list.ToList<Product>();
                var totalCount = list.Count();

                paginatedres.pageSize = 6;
                paginatedres.pageNumber = page;
                paginatedres.totalCount = count;
                return Ok(paginatedres);
            }
            var result = await _context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .Where(p => p.ProductBrandId == brandId || p.ProductTypeId == typeId)
                .ToListAsync();
            var itemcount = result.Count;
            var paginatedresult = GetProductsWithPaginations(result.ToList<Product>(),page, searchstring, pageSize);
            var ordList = orderItems(paginatedresult.data, sort);

            paginatedresult.data = ordList.ToList<Product>();
            paginatedresult.pageSize = 6;
            paginatedresult.pageNumber = page;
            paginatedresult.totalCount = itemcount;
            return Ok(paginatedresult);
        }


        [HttpGet("{id}")]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK)]
        [ProducesResponseTypeAttribute( StatusCodes.Status404NotFound)]
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
