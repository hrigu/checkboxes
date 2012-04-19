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
          name: "eins",
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
    it("should build checkboxes with friends", function() {
      var checkboxGroup, checkboxes, desc, eins, fan, friend, zwei;
      desc = [
        {
          name: "eins",
          checked: false,
          friends: ["zwei"]
        }, {
          name: "zwei",
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
      return expect(fan).toBe(eins);
    });
    return describe("should interpret the type property", function() {
      it("the default type is 'cb.Checkboxes'", function() {
        var checkboxGroup, checkboxes, desc;
        desc = [
          {
            name: "eins",
            checked: false
          }
        ];
        checkboxGroup = parser.parse(desc);
        checkboxes = checkboxGroup.allCheckboxes;
        return expect(checkboxes[0] instanceof cb.Checkbox).toBe(true);
      });
      it("the type 'normal'  is 'cb.Checkboxes'", function() {
        var checkboxGroup, checkboxes, desc;
        desc = [
          {
            name: "eins",
            checked: false,
            type: "normal"
          }
        ];
        checkboxGroup = parser.parse(desc);
        checkboxes = checkboxGroup.allCheckboxes;
        return expect(checkboxes[0] instanceof cb.Checkbox).toBe(true);
      });
      it("the type 'super'  is 'cb.SuperCheckbox'", function() {
        var checkboxGroup, checkboxes, desc;
        desc = [
          {
            name: "eins",
            checked: false,
            type: "super"
          }
        ];
        checkboxGroup = parser.parse(desc);
        checkboxes = checkboxGroup.allCheckboxes;
        return expect(checkboxes[0] instanceof cb.SuperCheckbox).toBe(true);
      });
      return it("throws an exception when type is unknown", function() {
        var desc;
        desc = [
          {
            name: "eins",
            checked: false,
            type: "unknown"
          }
        ];
        try {
          return parser.parse(desc);
        } catch (e) {
          return expect(e).toBe("could not interpret 'type' property 'unknown'");
        }
      });
    });
  });

}).call(this);
