USE person;

DELIMITER $$
USE `person`$$

CREATE PROCEDURE `personAddOrEdit` (
  IN _id INT,
  IN _name VARCHAR(45),
  IN _birth date
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO person(name, birth)
    VALUES (_name, _birth);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE person
    SET
    name = _name,
    birth = _birth
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END
