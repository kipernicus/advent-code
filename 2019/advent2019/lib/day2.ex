defmodule Day2 do
  def solution do
    input = File.read!(Path.join(["inputs", "day2.txt"]))
    values = String.split(input, ",")
             |> Enum.map(fn val -> String.to_integer(val) end)
    program_input = seed_program(values, 12, 2)
    part1 = Enum.at(execute(program_input), 0)
    part2 = for(
              noun <- 0..99,
              verb <- 0..99,
              do: {noun, verb}
            )
            |> Enum.find(
                 fn {noun, verb} ->
                   (
                     seed_program(values, noun, verb)
                     |> execute()
                     |> Enum.at(0)) === 19_690_720
                 end
               )
    [part1: part1, part2: part2]
  end

  def seed_program(program, noun, verb) do
    List.replace_at(program, 1, noun)
    |> List.replace_at(2, verb)
  end

  @doc """
  iex> Day2.execute([1,0,0,0,99])
  [2,0,0,0,99]
  iex> Day2.execute([2,3,0,3,99])
  [2,3,0,6,99]
  iex> Day2.execute([2,4,4,5,99,0])
  [2,4,4,5,99,9801]
  iex> Day2.execute([1,1,1,4,99,5,6,0,99])
  [30,1,1,4,2,5,6,0,99]
  """
  def execute(program, pointer \\ 0) do
    left_index = Enum.at(program, pointer + 1)
    right_index = Enum.at(program, pointer + 2)
    left = Enum.at(program, left_index)
    right = Enum.at(program, right_index)
    output = Enum.at(program, pointer + 3)
    next_pointer = pointer + 4
    case Enum.at(program, pointer) do
      1 ->
        new_program = List.replace_at(program, output, left + right)
        execute(new_program, next_pointer)
      2 ->
        new_program = List.replace_at(program, output, left * right)
        execute(new_program, next_pointer)
      99 ->
        program
      _ ->
        IO.puts("DEATH!!!!!!")
    end
  end
end

IO.inspect(Day2.solution())
