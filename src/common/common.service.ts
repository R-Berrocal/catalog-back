import { Injectable, Logger } from '@nestjs/common';
import { Repository, FindOptionsWhere } from 'typeorm';

import { PaginationDto } from './dtos/pagination.dto';

@Injectable()
export class CommonService<T> {
  readonly logger = new Logger(CommonService.name);

  constructor(private readonly repository: Repository<T>) {}

  async findAll({
    limit = 10,
    page = 1,
    relations,
    order,
    ...filters
  }: PaginationDto<T>) {
    const [items, count] = await this.repository.findAndCount({
      take: limit,
      skip: this.getOffset(page, limit),
      where: filters as FindOptionsWhere<T>,
      relations,
      order,
    });

    return {
      previousPage: this.getPreviousPage(page),
      currentPage: page,
      nextPage: this.getNextPage(page, limit, count),
      totalPages: this.getTotalPages(limit, count),
      totalItems: count,
      limit,
      items,
    };
  }

  getOffset(page: number, limit: number) {
    return page * limit - limit;
  }

  getPreviousPage(page: number) {
    if (page <= 1) return 1;
    return page - 1;
  }

  getNextPage(page: number, limit: number, total: number) {
    if (total / limit < page) return null;
    return page + 1;
  }

  getTotalPages(limit: number, total: number) {
    return Math.ceil(total / limit);
  }
}
