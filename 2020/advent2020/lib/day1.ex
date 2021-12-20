#values = String.split(input) |> Enum.map(&String.to_integer/1)
#values = String.split(input) |> Enum.map(&String.to_integer(&1))
#values = String.split(input) |> Enum.filter(& &1) |> Enum.map(&String.to_integer(&1))

defmodule Day1 do
  def solution do
    values = Path.join(["inputs", "day1.txt"])
             |> File.read!()
             |> String.split()
             |> Enum.map(fn val -> String.to_integer(val) end)
    fix_expense_reportA(values)
    fix_expense_reportB(values, [])

  end
  def fix_expense_reportA([]) do
    []
  end
  def fix_expense_reportA([next | rest]) do
    fix_expense_reportA(rest)
    match = 2020 - next
    found_match = Enum.find(rest, -1, fn x -> x == match end)
    output_solutionA(next, found_match)
  end
  def output_solutionA(num, -1) do
    num
  end
  def output_solutionA(num, match) do
    IO.inspect(num * match)
  end

  def fix_expense_reportB([]) do

  end

end

Day1.solution()

