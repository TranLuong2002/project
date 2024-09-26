import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient();
const prismass = new PrismaClient().$extends({
    model: {
      user: {
        async signUp(email, password,auth0Id) {
          const hash = await bcrypt.hash(password, 10);
          return prisma.user.create({
            data: {
              email,
              auth0Id,
              password: {
                create: {
                  hash,
                },
              },
            },
          });
        },
    },
},
});
async function main() {
    try {
        const newUser = await prismass.user.signUp('newuser@gmail.com', 'test123','auth0|123456789');
        console.log('User created:', newUser);
      } catch (error) {
        console.error('Error creating user:', error);
      } finally {
        await prisma.$disconnect();
      }
}
main()
.catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });