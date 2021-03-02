import {
  BadRequestException,
  UnauthorizedException,
  MethodNotAllowedException,
  ForbiddenException,
  HttpMethods,
  NotFoundException,
  NotImplementedException,
} from '../../utils/http';
describe('Suite test http utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be raise exception BadRequestException', () => {
    expect(() => {
      throw new BadRequestException('Body is empty');
    }).toThrow('Body is empty');
  });

  it('should be raise exception UnauthorizedException', () => {
    expect(() => {
      throw new UnauthorizedException('token is required');
    }).toThrow('token is required');
  });

  it('should be raise exception MethodNotAllowedException', () => {
    expect(() => {
      throw new MethodNotAllowedException('GET', HttpMethods.POST);
    }).toThrow(
      `This route only accepts the ${HttpMethods.POST} method, you tried: GET`,
    );
  });

  it('should be raise exception ForbiddenException', () => {
    expect(() => {
      throw new ForbiddenException('FORBIDDEN');
    }).toThrow('FORBIDDEN');
  });

  it('should be raise exception NotFoundException', () => {
    expect(() => {
      throw new NotFoundException('Not Found');
    }).toThrow('Not Found');
  });

  it('should be raise exception NotImplementedException', () => {
    expect(() => {
      throw new NotImplementedException('Not Implemented');
    }).toThrow('Not Implemented');
  });
});
