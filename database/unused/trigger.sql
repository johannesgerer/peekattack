#### used in ratingsAndCredits.sql

delimiter |
CREATE TRIGGER removeCredits AFTER DELETE ON tCredits
  FOR EACH ROW BEGIN

      UPDATE tUsers u SET
      u.fCredits = u.fCredits - OLD.fCredits,
      u.tCreditsUpdated = NOW()
      WHERE u.fID = OLD.fUserID;

   END;
|
delimiter;

delimiter |
CREATE TRIGGER addCredits AFTER INSERT ON tCredits
  FOR EACH ROW BEGIN

      UPDATE tUsers u SET
      u.fCredits = u.fCredits + NEW.fCredits,
      u.fTotalCredits = u.fTotalCredits + NEW.fCredits,
      u.tCreditsUpdated = NOW()
      WHERE u.fID = NEW.fUserID;

   END;
|
delimiter;

delimiter |
CREATE TRIGGER removeRatings AFTER DELETE ON tPendingRatings
  FOR EACH ROW BEGIN

      UPDATE tUsers u SET
      u.fSexual = u.fSexual- OLD.fRating
      WHERE u.fID = OLD.fRateeUserID;

   END;
|
delimiter;