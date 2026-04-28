import { error } from 'node:console';
import { prisma } from './prisma';

export const checkDatabaseConnection = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }
}