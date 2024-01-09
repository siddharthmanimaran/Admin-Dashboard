const { db } = require('@vercel/postgres');
const { staff, store } = require('../app/lib/data');

const seedUsers = async (client) => {
    try {
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS actor (
        actor_id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        last_update TIMESTAMP
      );
    `;
        console.log(`Created "users" table`);
        const insertedUsers = await Promise.all(
            actor.map(async (user) => {
                return client.sql`
        INSERT INTO actor (actor_id, first_name, last_name, last_update)
        VALUES (${user.actor_id}, ${user.first_name}, ${user.last_name}, ${user.last_update})
        ON CONFLICT (actor_id) DO NOTHING;
      `;
            }),
        );
        console.log(`Seeded ${insertedUsers.length} users`);
        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

const seedAddress = async (client) => {
    try {
        const createTable = await client.sql`
             CREATE TABLE address (
                address_id SERIAL PRIMARY KEY,
                address VARCHAR(100),
                address2 VARCHAR(100),
                district VARCHAR(100),
                city_id INT,
                postal_code VARCHAR(20),
                phone VARCHAR(20),
                last_update TIMESTAMP
                )`;
        console.log(`Created "address" table`, createTable);
        const inserted = await Promise.all(
            address.map(async (addres, i) => {
                return client.sql`
                INSERT INTO address (address_id, address, address2, district, city_id, postal_code, phone, last_update)
                VALUES (${addres.address_id}, ${addres.address}, ${addres.address2}, ${addres.district}, ${addres.city_id}, ${addres.postal_code}, ${addres.phone}, ${addres.last_update})
                ON CONFLICT (address_id) DO NOTHING;
              `;
            }),
        );
        console.log(`Seeded ${inserted.length} address`);

        return {
            createTable,
            addess: inserted
        }
    } catch (error) {
        console.error('Error seeding address:', error);
        throw error;
    }
}

const seedCategory = async (client) => {
    try {
        const createTable = await client.sql`CREATE TABLE category (
            category_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            last_update TIMESTAMP
        )`;
        const insertCategory = await Promise.all(category.map(async (cat, i) => {
            return client.sql`
            INSERT INTO category (category_id, name, last_update)
            values (${cat.category_id}, ${cat.name}, ${cat.last_update})
            ON CONFLICT (category_id) DO NOTHING`
        }));
        return {
            // createTable,
            insertCategory
        }
    } catch (error) {
        throw error
    }
}

const seedCity = async (client) => {
    try {
        //         const createTable = await client.sql`
        //     CREATE TABLE city (
        //         city_id INTEGER PRIMARY KEY,
        //         city VARCHAR(50),
        //         country_id SMALLINT,
        //         last_update TIMESTAMP
        //     )
        // `;

        const insertCity = await Promise.all(city.map(async (item, i) => {
            return client.sql`
            INSERT INTO city (city_id ,city, country_id, last_update)
            VALUES (${item.city_id}, ${item.city}, ${item.country_id}, ${item.last_update})
            ON CONFLICT (city_id) DO NOTHING`
        }));
        return {
            // createTable,
            insertCity
        }
    } catch (error) {
        throw error
    }
}

const seedCountry = async (client) => {
    const createTable = await client.sql`CREATE TABLE country (
        country_id INTEGER PRIMARY KEY,
        country VARCHAR(50),
        last_update TIMESTAMP
        )`;
    const insertCountry = await Promise.all(country.map((item, i) => {
        return client.sql`INSERT INTO COUNTRY
         (country_id, country, last_update)
         VALUES (${item.country_id}, ${item.country}, ${item.last_update})
         ON CONFLICT (country_id) DO NOTHING`
    }));
    return {
        createTable,
        insertCountry
    }
}

const seedCreateTable = async (client) => {
    try {
        const createCustomerTable = await client.sql`CREATE TABLE IF NOT EXISTS customer (
            customer_id INTEGER PRIMARY KEY,
            store_id SMALLINT,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(50),
            address_id SMALLINT,
            activebool BOOLEAN,
            create_date DATE,
            last_update TIMESTAMP,
            active INTEGER
        )`;
        // const createEnumType = await client.sql`CREATE TYPE mpaa_rating AS ENUM ('G', 'PG', 'PG-13', 'R', 'NC-17')`;
        const createFlimTable = await client.sql`CREATE TABLE IF NOT EXISTS film (
            film_id INTEGER PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            release_year INTEGER,
            language_id SMALLINT,
            rental_duration SMALLINT,
            rental_rate DECIMAL(10, 2),
            length SMALLINT,
            replacement_cost DECIMAL(5, 2),
            rating mpaa_rating,
            last_update TIMESTAMP,
            special_features TEXT[],
            fulltext TSVECTOR
        )`;
        const createFlimActorTable = await client.sql`CREATE TABLE IF NOT EXISTS film_actor (
            actor_id SMALLINT PRIMARY KEY,
            film_id SMALLINT,
            last_update TIMESTAMP
        )`;
        const createfILMcATGORYTable = await client.sql`CREATE TABLE IF NOT EXISTS film_category (
            film_id SMALLINT PRIMARY KEY,
            category_id SMALLINT,
            last_update TIMESTAMP
        )`;
        const createInventoryTable = await client.sql`CREATE TABLE IF NOT EXISTS inventory (
            inventory_id INTEGER PRIMARY KEY,
            film_id SMALLINT,
            store_id SMALLINT,
            last_update TIMESTAMP
        )`;
        const createLanguageTable = await client.sql`CREATE TABLE IF NOT EXISTS language (
            langiage_id INTEGER PRIMARY KEY,
            name VARCHAR(25),
            last_update TIMESTAMP
        )`;
        const createpaymentTable = await client.sql`CREATE TABLE IF NOT EXISTS payment (
            payment_id INTEGER PRIMARY KEY,
            customer_id SMALLINT,
            staff_id SMALLINT,
            rental_id INTEGER,
            amount NUMERIC(5,2),
            payment_date TIMESTAMP
        )`;
        const createrentalTable = await client.sql`CREATE TABLE IF NOT EXISTS rental (
            rental_id INTEGER PRIMARY KEY,
            rental_date TIMESTAMP,
            inventory_id INTEGER,
            customer_id SMALLINT,
            return_date TIMESTAMP,
            staff_id SMALLINT,
            last_update TIMESTAMP
        )`;
        const createstaffTable = await client.sql`CREATE TABLE IF NOT EXISTS staff (
            staff_id INTEGER PRIMARY KEY,
            first_name VARCHAR(45),
            last_name VARCHAR(45),
            address_id SMALLINT,
            email VARCHAR(50),
            store_id SMALLINT,
            active BOOLEAN,
            username VARCHAR(16),
            password VARCHAR(40),
            last_update TIMESTAMP,
            picture BYTEA
        )`;
        const createstoreTable = await client.sql`CREATE TABLE IF NOT EXISTS store (
            store_id INTEGER PRIMARY KEY,
            manager_staff_id SMALLINT,
            address_id SMALLINT,
            last_update TIMESTAMP
        )`;
        return {
            createCustomerTable,
            // createEnumType,
            createFlimTable,
            createFlimActorTable,
            createfILMcATGORYTable,
            createInventoryTable,
            createLanguageTable,
            createpaymentTable,
            createrentalTable,
            createstaffTable,
            createstoreTable
        }
    } catch (error) {
        throw error
    }
}

const seedAllData = async (client) => {
    try {
        const insert_createCustomerTable = await Promise.all(customer.map((item, i) => {
            return client.sql`INSERT INTO customer
            (customer_id, store_id, first_name, last_name, email, address_id, activebool, create_date, last_update, active)
            VALUES (${item.customer_id}, ${item.store_id}, ${item.first_name}, ${item.last_name}, ${item.email}, ${item.address_id}, ${item.activebool}, ${item.create_date}, ${item.last_update}, ${item.active})
            ON CONFLICT (customer_id) DO NOTHING`

        }));

        const insert_createFlimTable = await Promise.all(film.map(async (item, i) => {
            const data = await client.sql`INSERT INTO film
            (film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, last_update, special_feature, fulltext)
            VALUES (${item.film_id}, ${item.title}, ${item.description}, ${item.release_year}, ${item.language_id}, ${item.rental_duration}, ${item.rental_rate}, ${item.length}, ${item.replacement_cost}, ${item.rating}, ${item.last_update}, ${item.special_features}, ${item.fulltext})
            ON CONFLICT (film_id) DO NOTHING`;
            return data
        }))

        const insert_createFlimActorTable = await Promise.all(film_actor.map(async (item, i) => {
            const ins = await client.sql`INSERT INTO film_actor
        (actor_id, film_id, last_update)
        VALUES (${item.actor_id}, ${item.film_id}, ${item.last_update})`
            console.log("🚀 ~ file: seed.js:264 ~ constinsert_createFlimActorTable=awaitPromise.all ~ ins:", i);
            return ins
        }))
        console.log("🚀 ~ file: seed.js:267 ~ constinsert_createFlimActorTable=awaitPromise.all ~ insert_createFlimActorTable:", insert_createFlimActorTable.length)

        const inaser_createfILMcATGORYTable = await Promise.all(film_category.map(async (item, i) => {
            const ins = await client.sql`INSERT INTO film_category
            (film_id, category_id, last_update)
            VALUES (${item.film_id}, ${item.category_id}, ${item.last_update})
            ON CONFLICT (film_id) DO NOTHING`;
            console.log("🚀 ~ file: seed.js:275 ~ constinaser_createfILMcATGORYTable=awaitPromise.all ~ i:", i + 1);
            return ins
        }))
        console.log("🚀 ~ file: seed.js:276 ~ constinaser_createfILMcATGORYTable=awaitPromise.all ~ inaser_createfILMcATGORYTable:", inaser_createfILMcATGORYTable.length)

        const insert_createInventoryTable = await Promise.all(inventory.map(async (item, i) => {
            const ins = await client.sql`INSERT INTO inventory
            (inventory_id, film_id, store_id, last_update)
            VALUES (${item.inventory_id}, ${item.film_id}, ${item.store_id}, ${item.last_update})
            ON CONFLICT (inventory_id) DO NOTHING`
            console.log("🚀 ~ file: seed.js:283 ~ constinsert_createInventoryTable=awaitPromise.all ~ ins:", i + 1)
            return ins
        }))
        console.log("🚀 ~ file: seed.js:286 ~ constinsert_createInventoryTable=awaitPromise.all ~ insert_createInventoryTable:", insert_createInventoryTable.length)

        const insert_createLanguageTable = await Promise.all(language.map(async (item, i) => {
            const ins = await client.sql`INSERT INTO language
            (langiage_id, name, last_update)
            VALUES (${item.language_id}, ${item.name}, ${item.last_update})
            ON CONFLICT (langiage_id) DO NOTHING`
            console.log("🚀 ~ file: seed.js:293 ~ constinsert_createLanguageTable=awaitPromise.all ~ ins:", i + 1)

            return ins
        }))
        console.log("🚀 ~ file: seed.js:297 ~ constinsert_createLanguageTable=awaitPromise.all ~ insert_createLanguageTable:", insert_createLanguageTable.length);

        const insert_createpaymentTable = await Promise.all(payment.map(async (item, i) => {
            const ins = await client.sql`INSERT INTO payment
            (payment_id, customer_id, staff_id, rental_id, amount, payment_date)
            VALUES (${item.payment_id}, ${item.customer_id}, ${item.staff_id}, ${item.rental_id}, ${item.amount}, ${item.payment_date})`;
            console.log("🚀 ~ file: seed.js:303 ~ constinsert_createpaymentTable=awaitPromise.all ~ ins:", i + 1)
            return ins
        }))
        console.log("🚀 ~ file: seed.js:306 ~ constinsert_createpaymentTable=awaitPromise.all ~ insert_createpaymentTable:", insert_createpaymentTable.length)

        const insert_createrentalTable = await Promise.all(rental.map(async (item, i) => {
            const ins = await client.sql`INSERT INTO rental
            (rental_id, rental_date, inventory_id, customer_id, return_date, staff_id, last_update)
            VALUES (${item.rental_id}, ${item.rental_date}, ${item.inventory_id}, ${item.customer_id}, ${item.return_date}, ${item.staff_id}, ${item.last_update})
            ON CONFLICT (rental_id) DO NOTHING`
            console.log("🚀 ~ file: seed.js:313 ~ constinsert_createrentalTable=awaitPromise.all ~ ins:", i);
            return ins;
        }))
        console.log("🚀 ~ file: seed.js:316 ~ constinsert_createrentalTable=awaitPromise.all ~ insert_createrentalTable:", insert_createrentalTable.length)

        const insert_createstaffTable = await Promise.all(staff.map(async (item, i) => {
            return client.sql`INSERT INTO staff
            (staff_id, first_name, last_name, address_id, email, store_id, active, username, password, last_update, picture)
            VALUES (${item.staff_id}, ${item.first_name}, ${item.last_name}, ${item.address_id}, ${item.email}, ${item.store_id}, ${item.active}, ${item.username}, ${item.password}, ${item.last_update}, ${item.picture})
            ON CONFLICT (staff_id) DO NOTHING`
        }))
        console.log("🚀 ~ constinsert_createstaffTable=awaitPromise.all ~ insert_createstaffTable:", insert_createstaffTable.length)
        const insert_createstoreTable = await Promise.all(store.map(async (item, i) => {
            return client.sql`INSERT INTO store
            (store_id, manager_staff_id, address_id, last_update)
            VALUES (${item.store_id}, ${item.manager_staff_id}, ${item.address_id}, ${item.last_update})
            ON CONFLICT (store_id) DO NOTHING`;
        }))
        console.log("🚀 ~ constinsert_createstoreTable=awaitPromise.all ~ insert_createstoreTable:", insert_createstoreTable.length)
    } catch (error) {
        throw error

    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedAddress(client);
    await seedCategory(client)
    await seedCity(client);
    await seedCountry(client);
    await seedCreateTable(client)
    await seedAllData(client);

    await client.end();
    console.log('done!!!!!!!');
}


main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});