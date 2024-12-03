CREATE OR REPLACE FUNCTION get_filtered_data_json(
    table_name TEXT,
    column_name TEXT,
    filter_value TEXT
)
RETURNS SETOF JSON AS $$
BEGIN
    RETURN QUERY EXECUTE format(
        'SELECT row_to_json(t) FROM (SELECT * FROM %I WHERE %I = %L) t',
        table_name,
        column_name,
        filter_value
    );
END;
$$ LANGUAGE plpgsql;


-- SELECT * FROM get_filtered_data_json('admins', 'admin_id', '3'); --! How to run the function