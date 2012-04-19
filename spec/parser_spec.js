(function() {

  describe("parser", function() {
    var parser;
    parser = null;
    beforeEach(function() {
      return parser = new cb.Parser();
    });
    it("should be initializable", function() {
      return expect(parser instanceof cb.Parser).toBe(true);
    });
    it("should build a checkbox from a json object", function() {
      var checkboxGroup, checkboxes, desc, eins;
      desc = [
        {
          id: "eins",
          checked: false
        }
      ];
      checkboxGroup = parser.parse(desc);
      checkboxes = checkboxGroup.allCheckboxes;
      expect(checkboxes.length).toBe(1);
      eins = checkboxes[0];
      expect(eins instanceof cb.Checkbox).toBe(true);
      expect(eins.name).toBe("eins");
      return expect(eins.checked).toBe(false);
    });
    return it("should build checkboxes with friends", function() {
      var checkboxGroup, checkboxes, desc, eins, fan, friend, zwei;
      desc = [
        {
          id: "eins",
          checked: false,
          friends: ["zwei"]
        }, {
          id: "zwei",
          checked: true
        }
      ];
      checkboxGroup = parser.parse(desc);
      checkboxes = checkboxGroup.allCheckboxes;
      expect(checkboxes.length).toBe(2);
      eins = checkboxes[0];
      expect(eins.friends.length).toBe(1);
      friend = checkboxes[0].friends[0];
      expect(friend instanceof cb.Checkbox).toBe(true);
      expect(friend.name).toBe("zwei");
      zwei = checkboxes[1];
      expect(friend).toBe(zwei);
      expect(zwei.friends.length).toBe(0);
      expect(friend.fans.length).toBe(1);
      fan = friend.fans[0];
      expect(fan.name).toBe("eins");
      expect(fan).toBe(eins);
      return expect();
    });
  });

}).call(this);
