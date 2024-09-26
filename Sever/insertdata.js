import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      userName: 'john_doe',
      isEmailVerified: true,
      isAdmin: false,
      picture: 'https://example.com/john-doe.png',
      products: {
        create: [
          {
            name: 'Product 1',
            description: 'This is product 1',
            url: 'https://example.com/product1',
            reviews: {
              create: [
                {
                  content: 'Great product!',
                  stars: '5',
                  images: 'https://example.com/review-image1.png',
                  contry: 'USA',
                },
                {
                  content: 'Not bad!',
                  stars: '4',
                  contry: 'Canada',
                }
              ],
            },
          },
          {
            name: 'Product 2',
            description: 'This is product 2',
            url: 'https://example.com/product2',
            reviews: {
              create: [
                {
                  content: 'Amazing!',
                  stars: '5',
                  contry: 'UK',
                }
              ],
            },
          }
        ],
      },
    },
  });

  console.log('User created:', user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
