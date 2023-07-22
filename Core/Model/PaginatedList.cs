using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Model
{
    public class PaginatedList
    {
        public int pageSize { get; set; } = 5;
        public int pageNumber { get; set; }

        public int totalCount { get; set; }
        public List<Product> data { get; set; }
    }

}
