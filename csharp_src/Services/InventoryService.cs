using System;
using System.Collections.Generic;
using System.Linq;

namespace ShouTech.ERP.Core.Services
{
    public class MaterialItem
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Barcode { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;
        public string NameEn { get; set; } = string.Empty;
        public decimal PriceRetail { get; set; }
        public decimal Cost { get; set; }
        public decimal QtyOnHand { get; set; }
        public string DefaultUnit { get; set; } = "Piece";
        public decimal TaxRate { get; set; } = 15.0m;
    }

    public class InventoryService
    {
        private readonly List<MaterialItem> _materials = new();

        public void SeedDefaultMaterials()
        {
            _materials.Clear();
            _materials.Add(new MaterialItem
            {
                Id = 101,
                Code = "MAT-001",
                Barcode = "6281001001011",
                NameAr = "وحدة معالجة مركزية ShouTech Pro CPU 8-Core",
                NameEn = "ShouTech Pro CPU 8-Core Processor",
                PriceRetail = 1250.00m,
                Cost = 850.00m,
                QtyOnHand = 45m
            });

            _materials.Add(new MaterialItem
            {
                Id = 102,
                Code = "MAT-002",
                Barcode = "6281002002022",
                NameAr = "شاشة عرض ذكية 27 بوصة 4K UltraHD",
                NameEn = "Smart Display 27 inch 4K UltraHD",
                PriceRetail = 1800.00m,
                Cost = 1200.00m,
                QtyOnHand = 28m
            });
        }

        public MaterialItem? FindByBarcode(string barcode)
        {
            return _materials.FirstOrDefault(m => m.Barcode == barcode || m.Code == barcode);
        }

        public bool DeductStock(string code, decimal quantity)
        {
            var item = _materials.FirstOrDefault(m => m.Code == code);
            if (item == null || item.QtyOnHand < quantity) return false;
            item.QtyOnHand -= quantity;
            return true;
        }

        public int GetMaterialCount() => _materials.Count;
        public IReadOnlyList<MaterialItem> GetAll() => _materials.AsReadOnly();
    }
}
