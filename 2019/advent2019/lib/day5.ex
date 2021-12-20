defmodule Day5 do
  def solution do
    input = File.read!(Path.join(["inputs", "day5.txt"]))
    values = String.split(input, ",")
             |> Enum.map(fn val -> String.to_integer(val) end)
#    program_input = seed_program(values, 12, 2)
    part1 = Enum.at(execute(values), 0)
#    part2 = for(
#              noun <- 0..99,
#              verb <- 0..99,
#              do: {noun, verb}
#            )
#            |> Enum.find(
#                 fn {noun, verb} ->
#                   (
#                     seed_program(values, noun, verb)
#                     |> execute()
#                     |> Enum.at(0)) === 19_690_720
#                 end
#               )
#    [part1: part1, part2: part2]
  end

  def seed_program(program, noun, verb) do
    List.replace_at(program, 1, noun)
    |> List.replace_at(2, verb)
  end

  @doc """
  iex> Day5.execute([1,0,0,0,99])
  [2,0,0,0,99]
  iex> Day5.execute([2,3,0,3,99])
  [2,3,0,6,99]
  iex> Day5.execute([2,4,4,5,99,0])
  [2,4,4,5,99,9801]
  iex> Day5.execute([1,1,1,4,99,5,6,0,99])
  [30,1,1,4,2,5,6,0,99]
  """
  def execute(program, pointer \\ 0) do
    instruction = Enum.at(program, pointer)
    IO.inspect(program)
    IO.puts("INST")
    IO.puts(instruction)
    IO.puts(pointer)
    int_code = rem(instruction, 100)
    parameter_mode = div(instruction, 100)
                     |> rem(10)
    IO.puts("INFO")
    IO.puts(int_code)
    IO.puts(parameter_mode)
    case int_code do
      1 ->
        [p1, p2] = get_parameters(program, pointer, 2, parameter_mode)
        next_pointer = pointer + 4
        address = Enum.at(program, pointer + 3)
        new_program = List.replace_at(program, address, p1 + p2)
        execute(new_program, next_pointer)
      2 ->
        [p1, p2] = get_parameters(program, pointer, 2, parameter_mode)
        next_pointer = pointer + 4
        address = Enum.at(program, pointer + 3)
        new_program = List.replace_at(program, address, p1 * p2)
        execute(new_program, next_pointer)
      3 ->
        [p1] = get_parameters(program, pointer, 1, parameter_mode)
        IO.puts(p1)
        {input, _} = IO.gets("Input a code: ")
                     |> Integer.parse
        next_pointer = pointer + 2
        new_program = List.replace_at(program, p1, input)
        execute(new_program, next_pointer)
      4 ->
        [p1] = get_parameters(program, pointer, 1, parameter_mode)
        next_pointer = pointer + 2
        IO.puts("Output:")
        IO.puts(Enum.at(program, p1))
        execute(program, next_pointer)
      99 ->
        program
      _ ->
        IO.puts(int_code)
        IO.puts("DEATH!!!!!!")
    end
  end

  def get_parameters(program, pointer, count, 0) do
    for i <- 1..count, do: Enum.at(program, Enum.at(program, pointer + i)) |> IO.inspect
  end

  def get_parameters(program, pointer, count, 1) do
    for i <- 1..count, do: Enum.at(program, pointer + i)
  end
end

IO.inspect(Day5.solution())
