insert into trips(person_id, tripstartdate, tripenddate) values(
$1, $2, $3
) returning *