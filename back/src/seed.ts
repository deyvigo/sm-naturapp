import { initDatabase, getDb } from '@/database'

const PRODUCTS = [
  { name: 'Aceite de Coco Virgen', description: 'Aceite de coco orgánico prensado en frío, rico en ácidos grasos esenciales.', price: 35.00, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400', category: 'aceites', stock: 25, rating: 4.5, benefits: ['Hidratante natural', 'Antioxidante', 'Mejora digestión'] },
  { name: 'Aceite de Oliva Extra Virgen', description: 'Aceite de oliva italiano de primera presión en frío.', price: 42.00, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', category: 'aceites', stock: 20, rating: 4.7, benefits: ['Salud cardiovascular', 'Rico en vitamina E', 'Antiinflamatorio'] },
  { name: 'Aceite Esencial de Lavanda', description: 'Aceite esencial puro de lavanda para aromaterapia y relajación.', price: 28.00, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400', category: 'aceites', stock: 30, rating: 4.8, benefits: ['Relajante', 'Mejora el sueño', 'Alivia el estrés'] },
  { name: 'Espirulina en Polvo', description: 'Alga espirulina orgánica rica en proteínas y nutrientes esenciales.', price: 45.00, image: 'https://images.unsplash.com/photo-1612293905049-0f3c0e46a7b7?w=400', category: 'superfoods', stock: 15, rating: 4.6, benefits: ['Alto contenido proteico', 'Desintoxicante', 'Energía natural'] },
  { name: 'Chía Orgánica', description: 'Semillas de chía orgánica ricas en omega-3 y fibra.', price: 25.00, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400', category: 'superfoods', stock: 40, rating: 4.4, benefits: ['Omega-3', 'Fibra soluble', 'Hidratación'] },
  { name: 'Maca Andina', description: 'Maca peruana orgánica en polvo, energizante natural.', price: 32.00, image: 'https://images.unsplash.com/photo-1612294031083-3b2a5b2a0b7b?w=400', category: 'superfoods', stock: 20, rating: 4.3, benefits: ['Energía natural', 'Equilibrio hormonal', 'Vitalidad'] },
  { name: 'Cúrcuma con Jengibre', description: 'Cápsulas de cúrcuma orgánica con jengibre, antiinflamatorio natural.', price: 38.00, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400', category: 'capsulas', stock: 35, rating: 4.7, benefits: ['Antiinflamatorio', 'Digestivo', 'Antioxidante'] },
  { name: 'Ashwagandha', description: 'Cápsulas de ashwagandha para reducir el estrés y mejorar el rendimiento.', price: 42.00, image: 'https://images.unsplash.com/photo-1612293905049-0f3c0e46a7b7?w=400', category: 'capsulas', stock: 18, rating: 4.5, benefits: ['Reduce estrés', 'Mejora rendimiento', 'Equilibrio hormonal'] },
  { name: 'Vitamina D3 + K2', description: 'Suplemento de vitamina D3 y K2 para la salud ósea e inmune.', price: 36.00, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400', category: 'capsulas', stock: 22, rating: 4.6, benefits: ['Salud ósea', 'Sistema inmune', 'Absorción de calcio'] },
  { name: 'Té Verde Matcha', description: 'Matcha ceremonial orgánico de Japón, rico en antioxidantes.', price: 48.00, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', category: 'infusiones', stock: 12, rating: 4.9, benefits: ['Antioxidante', 'Energía sostenida', 'Concentración'] },
  { name: 'Manzanilla Floral', description: 'Flores de manzanilla orgánica para infusión relajante.', price: 18.00, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', category: 'infusiones', stock: 50, rating: 4.2, benefits: ['Relajante', 'Digestivo', 'Mejora el sueño'] },
  { name: 'Miel de Abeja Pura', description: 'Miel cruda orgánica sin filtrar, endulzante natural.', price: 30.00, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', category: 'miel', stock: 28, rating: 4.8, benefits: ['Antibacteriano', 'Energía natural', 'Alivia garganta'] },
  { name: 'Miel de Manuka', description: 'Miel de Manuka certificada con alto poder antibacteriano.', price: 65.00, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', category: 'miel', stock: 10, rating: 4.9, benefits: ['Antibacteriano potente', 'Cicatrizante', 'Refuerzo inmune'] },
  { name: 'Propóleo en Spray', description: 'Spray de propóleo natural para defensas y cuidado bucal.', price: 22.00, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', category: 'miel', stock: 30, rating: 4.3, benefits: ['Defensas naturales', 'Cuidado bucal', 'Antiséptico'] },
]

function seed() {
  initDatabase()
  const db = getDb()

  const existing = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number }
  if (existing.count > 0) {
    console.log('Database already seeded. Skipping.')
    return
  }

  const insert = db.prepare(`
    INSERT INTO products (name, description, price, image, category, stock, rating, benefits)
    VALUES (@name, @description, @price, @image, @category, @stock, @rating, @benefits)
  `)

  const insertMany = db.transaction((products: typeof PRODUCTS) => {
    for (const p of products) {
      insert.run({ ...p, benefits: JSON.stringify(p.benefits) })
    }
  })

  insertMany(PRODUCTS)
  console.log(`Seeded ${PRODUCTS.length} products.`)
}

seed()
