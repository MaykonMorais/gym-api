export class InMemoryUsersRepository {
  private users: any[] = [];

  create(data: any) {
    this.users.push(data);

    return this.users;
  }
}
