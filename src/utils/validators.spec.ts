import { validatorBody, validatorName, validatorUserId } from './validators';
describe('suite tests for validators', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Suite tests for validatorBody', () => {
    it('should be raise exception BadRequestException', () => {
      const data = '';
      expect(() => {
        validatorBody(data);
      }).toThrow('body is required');
    });
    it('should be not raise exception BadRequestException', () => {
      const data = 'body';
      expect(() => {
        validatorBody(data);
      }).not.toThrow();
    });
  });

  describe('Suite tests for validatorName', () => {
    it('should be raise exception BadRequestException', () => {
      const data = '';
      expect(() => {
        validatorName(data);
      }).toThrow('name is required');
    });
    it('should be not raise exception BadRequestException', () => {
      const data = 'name';
      expect(() => {
        validatorName(data);
      }).not.toThrow();
    });
  });

  describe('Suite tests for validatorUserId', () => {
    it('should be raise exception BadRequestException', () => {
      const data = '';
      expect(() => {
        validatorUserId(data);
      }).toThrow('userId is required');
    });
    it('should be not raise exception BadRequestException', () => {
      const data = 'UserId';
      expect(() => {
        validatorUserId(data);
      }).not.toThrow();
    });
  });
});
