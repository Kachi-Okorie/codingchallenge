const Robot = require('../modules/Robot');

describe('Robot Class Testing', () => {

    let robot = null;
    
    const Direction = {
        NORTH: 1,
        EAST: 2,
        SOUTH: 3,
        WEST: 4
    }

    beforeEach(() => {
        robot = new Robot({x: 5, y: 5});
    });

    it('should create a new robot with default values', () => {
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.NORTH);
        expect(robot.placed).toBeFalsy();
    });

    it('should place the robot in the correct position based on x,y and direction', () => {
        robot.place(3, 3, 'EAST');
        expect(robot.x).toBe(3);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.EAST);
    });

    it('should not place the robot if the direction is incorrect', () => {
        robot.place(3, 3, 'WES');
		expect(robot.x).toBe(0);
		expect(robot.y).toBe(0);
		expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should move the robot forward north', () => {
        robot.move();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(1);
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should move the robot forward east', () => {
        robot.place(3, 3,'EAST');
        robot.move();
        expect(robot.x).toBe(4);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.EAST);
    });

    it('should move the robot forward south', () => {
        robot.place(3, 3,'SOUTH');
        robot.move();
        expect(robot.x).toBe(3);
        expect(robot.y).toBe(2);
        expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('should move the robot forward west', () => {
        robot.place(3, 3,'WEST');
        robot.move();
        expect(robot.x).toBe(2);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('should not move the robot past the boundary of the grid', () => {
        robot.place(4, 4, 'NORTH');
        robot.move();
        expect(robot.x).toBe(4);
        expect(robot.y).toBe(4);
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should report the robot position and direction', () => {
        expect(robot.report()).toBe('0,0,NORTH');
    });

    it('should report correct direction after turning right from WEST', () => {
        robot.place(0, 0, 'WEST');
        robot.right(); // Turn right from WEST
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should validate a correct direction', () => {
        expect(robot.isValidDirection('INVALID')).toBe(false);
    });

    it('should not place the robot at an invalid location (5,5)', () => {
        expect(() => robot.place(5, 5, 'NORTH'));
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.NORTH);
        expect(robot.placed).toBeFalsy();
    });

    it('should not place the robot at an invalid location (-1,-1)', () => {
        expect(() => robot.place(-1, -1, 'NORTH'));
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.NORTH);
        expect(robot.placed).toBeFalsy();
    });

    //RIGHT Tests

    it('should turn right correctly from NORTH', () => {
        robot.place(0, 0, 'NORTH');
        robot.right();
        expect(robot.direction).toBe(Direction.EAST);
    });

    it('should turn right correctly from EAST', () => {
        robot.place(0, 0, 'EAST');
        robot.right();
        expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('should turn right correctly from SOUTH', () => {
        robot.place(0, 0, 'SOUTH');
        robot.right();
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('should turn right correctly from WEST', () => {
        robot.place(0, 0, 'WEST');
        robot.right();
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should complete a full cycle of directions turning right four times from NORTH', () => {
        robot.place(0, 0, 'NORTH');
        robot.right(); // to EAST
        expect(robot.direction).toBe(Direction.EAST);
        robot.right(); // to SOUTH
        expect(robot.direction).toBe(Direction.SOUTH);
        robot.right(); // to WEST
        expect(robot.direction).toBe(Direction.WEST);
        robot.right(); // to NORTH
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should maintain the same position while turning right', () => {
        robot.place(2, 3, 'NORTH');
        robot.right();
        expect(robot.x).toBe(2);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.EAST);
        robot.right();
        expect(robot.x).toBe(2);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('should handle multiple right turns correctly from any starting direction', () => {
        const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
        directions.forEach((startDirection, index) => {
            robot.place(0, 0, startDirection);
            robot.right();
            const expectedDirection = directions[(index + 1) % 4];
            expect(robot.convertDirectionToString()).toBe(expectedDirection);
        });
    });

    // Test for Left turns

    it('should turn left correctly from NORTH', () => {
        robot.place(0, 0, 'NORTH');
        robot.left();
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('should turn left correctly from WEST', () => {
        robot.place(0, 0, 'WEST');
        robot.left();
        expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('should turn left correctly from SOUTH', () => {
        robot.place(0, 0, 'SOUTH');
        robot.left();
        expect(robot.direction).toBe(Direction.EAST);
    });

    it('should turn left correctly from EAST', () => {
        robot.place(0, 0, 'EAST');
        robot.left();
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should complete a full cycle of directions turning left four times from NORTH', () => {
        robot.place(0, 0, 'NORTH');
        robot.left(); // to WEST
        expect(robot.direction).toBe(Direction.WEST);
        robot.left(); // to SOUTH
        expect(robot.direction).toBe(Direction.SOUTH);
        robot.left(); // to EAST
        expect(robot.direction).toBe(Direction.EAST);
        robot.left(); // to NORTH
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should maintain the same position while turning left', () => {
        robot.place(2, 3, 'NORTH');
        robot.left();
        expect(robot.x).toBe(2);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.WEST);
        robot.left();
        expect(robot.x).toBe(2);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('should handle multiple left turns correctly from any starting direction', () => {
        const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
        directions.forEach((startDirection, index) => {
            robot.place(0, 0, startDirection);
            robot.left();
            const expectedDirection = directions[(index + 3) % 4];
            expect(robot.convertDirectionToString()).toBe(expectedDirection);
        });
    });

    it('should return the correct direction string based on the direction index', () => {
        expect(robot.convertDirectionToString()).toBe('NORTH');
    });
});