import { Test, TestingModule } from '@nestjs/testing';
import { StreamsGateway } from './streams.gateway';
import { StreamsService } from './streams.service';

describe('StreamsGateway', () => {
  let gateway: StreamsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamsGateway, StreamsService],
    }).compile();

    gateway = module.get<StreamsGateway>(StreamsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
