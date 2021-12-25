import { BigQuery } from "@google-cloud/bigquery"
const bigquery = new BigQuery();

async function executeQuery(query: string) {
    // Creates a client
    const sqlQuery = query;

    const options = {
        query: sqlQuery,
        useLegacySql: false, // Use standard SQL syntax for queries.
    };

    // Runs the query
    return await bigquery.createQueryJob(options);
}


export default executeQuery;