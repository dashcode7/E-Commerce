using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CustomerBucket
    {
        public CustomerBucket()
        {

        }
        public CustomerBucket(string id)
        {
            id = id.Trim();
        }
        public string Id { get; set; }
        public List<BucketItem> Items { get; set; }= new List<BucketItem>();
    }
}
